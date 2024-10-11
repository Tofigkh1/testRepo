export class Record {
  constructor(
    userId,
    fullname,
    email,
    delivery_address,
    amount,
    contact,
    payment_method,
    products,
    date = new Date(),
    expiryDate // Yeni alan eklendi
  ) {
    this.userId = userId;
    this.fullname = fullname;
    this.email = email;
    this.delivery_address = delivery_address;
    this.amount = amount;
    this.contact = contact;
    this.payment_method = payment_method;
    this.products = products;
    this.date = date;
    this.expiryDate = expiryDate; // expiryDate tanımlandı
  }

  toPlainObject() {
    return {
      userId: this.userId,
      fullname: this.fullname,
      email: this.email,
      delivery_address: this.delivery_address,
      amount: this.amount,
      contact: this.contact,
      payment_method: this.payment_method,
      products: this.products,
      date: this.date,
      expiryDate: this.expiryDate // expiryDate eklendi
    };
  }
}
