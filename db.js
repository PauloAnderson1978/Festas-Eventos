const mysql = require("mysql2/promise");

// Conexão com o banco de dados MySQL
const client = mysql.createPool(process.env.CONNECTION_STRING);

async function selectCustomers(){
    const results = await client.query("SELECT * FROM clientes;")
    return results[0];
}
async function selectCustomer(id){
    const results = await client.query("SELECT * FROM clientes WHERE id=?;", [id]);
    return results[0];
}

async function insertCustomer(customer) {
    try {
        const values = [customer.nome, customer.email, customer.telefone, customer.assunto, customer.mensagem];
    await client.query("INSERT INTO clientes(nome, email, telefone, assunto, mensagem) VALUES (?, ?, ?, ?, ?)", values);
    } catch (error) {
        console.error("Erro ao inserir cliente:", error);
        throw error; // lança o erro para que a rota possa retornar um erro apropriado
    }
}

// Atualizar um cliente no banco de dados
async function updateCustomer(id, customerData) {
    const values = [customerData.nome, customerData.idade, customerData.uf, id];
    await client.query("UPDATE clientes SET nome = ?, email = ?, telefone = ?, assunto = ?, mensagem = ? WHERE id = ?", values);
}

// Deletar um cliente do banco de dados
async function deleteCustomer(id) {
    const values = [id];
    await client.query("DELETE FROM clientes WHERE id = ?", [id]);
}


module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}