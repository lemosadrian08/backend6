const knex = require('knex')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 module.exports.up = async function(knex) {
    const exist = await knex.schema.hasTable('messages');
    if (!exist){
        return knex.schema.createTable('messages', (table)=>{
            table.increments('id');
            table.string('date').notNullable();
            table.string('author').notNullable();
            table.string('text').notNullable();
        });
    };  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function(knex) {
    const exist = await knex.schema.hasTable('messages');
    if (exist){
        return knex.schema.dropTable('messages');
    }; 
};

