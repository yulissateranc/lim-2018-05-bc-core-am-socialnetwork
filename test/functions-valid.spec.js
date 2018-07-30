describe('validatorNameUser', () => {
  it('debería ser una funcion', () => {
    assert.equal(typeof window.validatorNameUser, 'function');
  });
  it('debería retornar true para yulissateran', () => {
    assert.deepEqual(window.validatorNameUser('yulissateran'), true);
  });
  it('debería retornar true para Janna Perez', () => {
    assert.deepEqual(window.validatorNameUser('Janna Perez'), true);
  });
  it('debería retornar true para Jossielin Abigail', () => {
    assert.deepEqual(window.validatorNameUser('Jossielin Abigail'), true);
  });
  it('debería retornar false para yuli', () => {
    assert.deepEqual(window.validatorNameUser('yuli'), false);
  });
  it('debería retornar false para Rojas%&', () => {
    assert.deepEqual(window.validatorNameUser('Rojas%&'), false);
  });
  it('debería retornar false para para string vacío', () => {
    assert.deepEqual(window.validatorNameUser(''), false);
  });
});
describe('validatorEmail', () => {
  it('debería ser una funcion', () => {
    assert.equal(typeof window.validatorEmail, 'function');
  });
  it('debería retornar true para yulissateran@gmail.com', () => {
    assert.deepEqual(window.validatorEmail('yulissateran@gmail.com'), true);
  });
  it('debería retornar true para Janna.Perez@outlook.com', () => {
    assert.deepEqual(window.validatorEmail('Janna.Perez@outlook.com'), true);
  });
  it('debería retornar true para Jossielin_Abigail@yahoo.es', () => {
    assert.deepEqual(window.validatorEmail('Jossielin_Abigail@yahoo.es'), true);
  });
  it('debería retornar false para a@gmail.com', () => {
    assert.deepEqual(window.validatorEmail('a@gmail.com'), false);
  });
  it('debería retornar false para Rojas%&hotmail.com', () => {
    assert.deepEqual(window.validatorEmail('Rojas%&hotmail.com'), false);
  });
  it('debería retornar false para para @.com', () => {
    assert.deepEqual(window.validatorEmail(''), false);
  });
});
describe('validatorPassword', () => {
  it('debería ser una funcion', () => {
    assert.equal(typeof window.validatorPassword, 'function');
  });
  it('debería retornar true para segura123', () => {
    assert.deepEqual(window.validatorPassword('segura123'), true);
  });
  it('debería retornar true para 67Candado', () => {
    assert.deepEqual(window.validatorPassword('67Candado'), true);
  });
  it('debería retornar false para 123', () => {
    assert.deepEqual(window.validatorPassword('123'), false);
  });
  it('debería retornar false para hola"#', () => {
    assert.deepEqual(window.validatorPassword('hola"#'), false);
  });
});
describe('validateContentOfpublications', () => {
  it('debería ser una funcion', () => {
    assert.equal(typeof window.validateContentOfpublications, 'function');
  });
  it('debería retornar true para Hoy me siento muy feliz', () => {
    assert.deepEqual(window.validateContentOfpublications('Hoy me siento muy feliz'), true);
  });
  it('debería retornar true para hhabíaunavezunelefantellamadomaiz que tenia 234 años', () => {
    assert.deepEqual(window.validateContentOfpublications('hhabíaunavezunelefantellamadomaiz que tenia 234 años'), true);
  });
  it('debería retornar false para     ola', () => {
    assert.deepEqual(window.validateContentOfpublications('   ola'), false);
  });
  it('debería retornar false para string vacío', () => {
    assert.deepEqual(window.validateContentOfpublications(''), false);
  });
});  