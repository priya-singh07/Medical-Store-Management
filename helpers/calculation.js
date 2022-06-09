const amount = (price, quantity, discount, gst) => {
    let value = price*quantity;
    let disvalue = (discount*value)/100;
    let gstcal = gst/200;
    let gst2 = gstcal*value;
    gst2*=2;
    let totalvalue = value-disvalue+gst2;
    return totalvalue;
}

module.exports = amount;
