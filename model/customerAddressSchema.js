const { Schema, model } = require('mongoose');

const customerAddressSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    name: { type: String, required: true },
    region_id: { type: Schema.Types.ObjectId, ref: 'Region', required: true },
    district_id: { type: Schema.Types.ObjectId, ref: 'District', required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    flat: { type: String, required: true },
    location: { type: String, required: true },
    post_index: { type: String, required: true },
    info: { type: String, default: null },
});

const CustomerAddress = model('CustomerAddress', customerAddressSchema);

module.exports = { CustomerAddress };