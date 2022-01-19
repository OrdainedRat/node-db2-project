// STRETCH
const cars = [
    {
        vin: "1FVNY5Y90HP312888",
        make:'chevy' ,
        model: 'cruze',
        mileage: 50000 ,
        transmission: 'automatic',
    },
    {
        vin: "JH4KA4650JC000403",
        make: 'ford',
        model: 'F150',
        mileage: 200000,
        title:'idk' ,
        transmission: 'automatic',
    },
    {
        vin: "WAUKEAFM8DA033285",
        make: 'Krupp',
        model: 'Panzerkampfwagen IV',
        mileage: 750000,
        title: 'title',
        transmission: 'dead',
    },
]

// exports.seed = function (knex) {
//     return knex('cars').insert(cars)
// }

exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
}