class Customer {
  orders = [];
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  addOrder(order) {
    this.orders.push(order);
  }
}
let customer1 = new Customer("Supanee", "Nakhon Pathom");

class Order {
  Payment = null;
  orderDetails = [];
  constructor(date, status) {
    this.date = date;
    this.status = status;
  }

  calcSubTotal() {
    let subTotal = 0;
    this.orderDetails.reduce(
      (total, orderDetail) => total + orderDetail.subTotal(),
      0
    );
  }

  calcTax() {
    let tax = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {
      tax += this.orderDetails[i].calcTax();
    }
    return tax;
  }

  calcTotal() {
    return this.calcSubTotal() + this.calcTax;
  }

  calcTotalWeight() {
    let Weight = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {
      Weight += this.orderDetails[i].calcTotalWeight();
    }
    return Weight;
  }
  addPayment(Payment) {
    this.Payment = Payment;
  }
  addOrderDetail(orderDetail) {
    this.orderDetails.push(orderDetail);
  }
}
let order1 = new Order("10/12/2564");
order1.calcSubTotal();
order1.calcTax();
order1.calcTotal();
order1.calcTotalWeight();
console.log(order1);

class OrderDetail {
  item = null;
  constructor(quantity, taxStatus) {
    this.quantity = quantity;
    this.taxStatus = taxStatus;
  }

  calcSubTotal() {
    return this.item.getPriceForQuantity(this.quantity) + this.calcTax;
  }

  calcWeight() {
    return this.item.shippingWeight;
  }

  calcTax() {
    return this.item.getTax(this.taxStatus);
  }
  addItem(item) {
    this.item = item;
  }
}

let orderDetail1 = new OrderDetail(2, "Taxable");
orderDetail1.calcSubTotal();
orderDetail1.calcWeight();
orderDetail1.calcTax();
console.log(orderDetail1);

class Item {
  inStock = true;
  constructor(shippingWeight, description, price) {
    this.shippingWeight = shippingWeight;
    this.description = description;
    this.price = price;
  }
  setInstock(status) {
    this.inStock = status;
  }

  getPriceForQuantity(quantity) {
    return this.price * quantity;
  }

  getTax(taxStatus) {
    if (taxStatus === "tax included") {
      return 0;
    } else {
      return this.price * 0.07;
    }
  }

  inStock() {
    return this.inStock;
  }
}

let item1 = new Item(3, "VeryGood", 150);
item1.getPriceForQuantity();
item1.getTax();
item1.inStock();
console.log(item1);

class Payment {
  constructor(amount) {
    this.amount = amount;
  }
}

class Cash extends Payment {
  constructor(amount, cashTendered) {
    super(amount);
    this.cashTendered = cashTendered;
  }
}

class Check extends Payment {
  constructor(amount, name, bankID) {
    super(amount);
    this.name = name;
    this.bankID = bankID;
  }

  authorized() {
    console.log("authorized");
  }
}

let check1 = new Check(350, "น้ำเจี๊ยบ", "350");
check1.authorized();
console.log(check1);

class Credit extends Payment {
  constructor(amount, number, type, expDate) {
    super(amount);
    this.number = number;
    this.type = type;
    this.expDate = expDate;
  }

  authorized() {
    console.log("authorized");
  }
}

//let credit1 = new Credit("shp",1, "0", "10-12-2564");
//credit1.authorized();
//console.log(credit1);

const main = () => {
  let customer1 = new Customer("Supanee Rungsirat", "Nakhon Pathom");
  //console.log(customer1);
  //product item
  const item1 = new Item(0.3, "อออินวัน", 299);
  const item2 = new Item(0.1, "ป็อปบอมบ์แซ่บ", 39);
  const item3 = new Item(0.2, "เดอะบอกซ์ ออลสตาร์", 159);
  const item4 = new Item(0.2, "ชิคแอนด์แชร์ ทีมนักเก็ตป็อป", 99);
  const item5 = new Item(0.4, "คอมโบข้าวไก่กรอบแกงเขียวหวาน เคเอฟซี", 89);

  //create order
  const order1 = new Order("8/1/2567", "In process");

  //add order to a customer
  customer1.addOrder(order1);
  //console.log(order1);

  //create orderdetail
  const orderDetail1 = new OrderDetail(5, "tax included");
  orderDetail1.addItem(item2);
  const orderDetail2 = new OrderDetail(2, "tax included");
  orderDetail2.addItem(item5);
  // console.log(orderDetail1);

  //add orderdetail to a order
  order1.addOrderDetail(orderDetail1);
  order1.addOrderDetail(orderDetail2);

  //console.log(customer1.orders[0]);

  //Name : Supanee Rungsirat
  //จำนวนคำสั่งซื้อ : 1
  //ลำดับที่ 1 ป็อปบอมบ์แซ่บ จำนวน 5 รายการ ราคา 195 บาท
  //ลำดับที่ 2 คอมโบข้าวได่กรอบแกงเขียวหวาน จำนวน 2 รายการ ราคา 178 บาท
  //รวมทั้งหมด 374 บาท

  console.log(customer1);
  console.log(" ชื่อ : " + customer1.name);
  console.log(" จำนวนคำสั่งซื้อ : " + customer1.orders.length);
  for (let i = 0; i < customer1.orders.length; i++) {
    console.log(" คำสั่งซื้อที่ : " + (i + 1));
    let total = 0;

    //console.log(customer1.orders[i].orderDetail);

    for (let k = 0; k < customer1.orders[i].orderDetails.length; k++) {
      const item = customer1.orders[i].orderDetails[k].item;
      const quantity = customer1.orders[i].orderDetails[k].quantity;
      const subTotal = quantity * item.price;
      total += subTotal;
      console.log(
        " ลำดับที่ " +
          (k + 1) +
          "" +
          item.description +
          " จำนวน " +
          quantity +
          " รายการ " +
          " ราคา " +
          subTotal +
          " บาท "
      );
    }
    console.log(" รวมทั้งหมด " + total + " บาท ");
  }

  //////////////////////////////////////////////////////////////////////

  const order2 = new Order("8/1/2567", "In process");

  //add order to a customer
  customer1.addOrder(order2);
  //console.log(order1);

  //create orderdetail
  const orderDetail3 = new OrderDetail(3, "tax included");
  orderDetail3.addItem(item1);
  const orderDetail4 = new OrderDetail(2, "tax included");
  orderDetail4.addItem(item4);
  // console.log(orderDetail1);

  //add orderdetail to a order
  order2.addOrderDetail(orderDetail3);
  order2.addOrderDetail(orderDetail4);

  //console.log(customer1.orders[0]);

  //Name : Supanee Rungsirat
  //จำนวนคำสั่งซื้อ : 1
  //ลำดับที่ 1 ป็อปบอมบ์แซ่บ จำนวน 5 รายการ ราคา 195 บาท
  //ลำดับที่ 2 คอมโบข้าวได่กรอบแกงเขียวหวาน จำนวน 2 รายการ ราคา 178 บาท
  //รวมทั้งหมด 374 บาท

  console.log(customer1);
  console.log(" ชื่อ : " + customer1.name);
  console.log(" จำนวนคำสั่งซื้อ : " + customer1.orders.length);
  for (let i = 0; i < customer1.orders.length; i++) {
    console.log(" คำสั่งซื้อที่ : " + (i + 1));
    let total = 0;

    //console.log(customer1.orders[i].orderDetail);

    for (let k = 0; k < customer1.orders[i].orderDetails.length; k++) {
      const item = customer1.orders[i].orderDetails[k].item;
      const quantity = customer1.orders[i].orderDetails[k].quantity;
      const subTotal = quantity * item.price;
      total += subTotal;
      console.log(
        " ลำดับที่ " +
          (k + 1) +
          "" +
          item.description +
          " จำนวน " +
          quantity +
          " รายการ " +
          " ราคา " +
          subTotal +
          " บาท "
      );
    }
    console.log(" รวมทั้งหมด " + total + " บาท ");
  }
};

main();