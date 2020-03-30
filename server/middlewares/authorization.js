const jwt = require('jsonwebtoken');

// Verificación del Token
//---------------------------
let checkToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Token inválido. Vuelva a logearse por favor.'
            });
        }
        // Todo el PAYLOAD está en 'decoded'
        req.usuario = decoded.usuario;
        next();
    });
};

// Verificación ADMIN_ROLE
//---------------------------
let checkAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    console.log(usuario);
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            message: 'El usuario NO es administrador'
        })
    }
}


module.exports = {
    checkToken,
    checkAdminRole
}