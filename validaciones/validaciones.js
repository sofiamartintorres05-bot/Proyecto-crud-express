// name > 3
// correo expresiones regulares
// id

// realizar los demas endponts aplicando estas validaciones 
// importar este archivo para usar las validaciones


function validarAprendiz(req, res, next) {
    const { id, nombre, correo } = req.body;
    const errores = [];

    // Validar nombre (> 3 letras)
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length <= 3) {
        errores.push('El nombre debe tener más de 3 letras.');
    }

    // Validar correo con expresión regular
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
        errores.push('Ingrese un correo electrónico válido.');
    }

    // Validar id (si se llega a enviar por el body, debe ser un número)
    if (id !== undefined && isNaN(Number(id))) {
        errores.push('El id debe ser un valor numérico válido.');
    }

    // Si hay errores, detener la petición
    if (errores.length > 0) {
        return res.status(400).json({ ok: false, errores });
    }

    next();
}

module.exports = { validarAprendiz };


