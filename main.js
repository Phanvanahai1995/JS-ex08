"use strict";
// Bài 1 ////////////////////////////////////////////////
var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
};

const isErrors = function (field) {
  const result = Object.values(errors).some((value) => {
    return (
      Object.keys(value).includes(field.slice(field.indexOf(".") + 1)) &&
      Object.keys(errors).includes(field.slice(0, field.indexOf(".")))
    );
  });

  return result;
};

const getError = function (field) {
  if (Object.keys(errors).includes(field)) {
    console.log(errors[field].required);
  } else if (isErrors(field)) {
    console.log(
      errors[field.slice(0, field.indexOf("."))][
        field.slice(field.indexOf(".") + 1)
      ]
    );
  } else {
    console.log("Lỗi khác");
  }
};

getError("name"); //Vui lòng nhập họ tên
getError("name.min"); //Họ tên phải từ 5 ký tự

getError("email"); //Vui lòng nhập địa chỉ email
getError("email.unique"); //Email đã có người sử dụng

getError("emailunique"); //Lỗi khác

// Bài 2 ////////////////////////////////////////////////
const Customers = function (name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
};

const customer1 = new Customers("Nguyễn Văn A", 11, "Ha Noi");
const customer2 = new Customers("Nguyễn Văn B", 2, "Hai Phong");
const customer3 = new Customers("Nguyễn Văn C", 12, "TP. HCM");

const customers = [customer1, customer2, customer3];

let result = [];
const createCustomers = function (elements) {
  for (const element of elements) {
    element.shortName =
      element.name.slice(0, element.name.indexOf(" ")) +
      element.name.slice(element.name.lastIndexOf(" "));
  }
  return elements;
};

result = createCustomers(customers);
console.log(result);

// Bài 3 ////////////////////////////////////////////////

const Register = function (name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
};

const data = [];
const handleRegister = function (name, password, email) {
  if (!name || !password || !email) {
    console.log("Vui lòng nhập đầy đủ các thông tin");
    return;
  }

  const userExist = data.find((user) => user.email === email);
  if (userExist) {
    console.log("Người dùng đã tồn tại");
  } else {
    const dataRegister = new Register(name, password, email);
    dataRegister.role = "user";
    data.push(dataRegister);
  }

  return data;
};

console.log(handleRegister("Nguyen Van A", "123456", "nguyenvana@email.com"));
console.log(handleRegister("Nguyen Van B", "123456", "nguyenvanb@email.com"));
console.log(handleRegister("Nguyen Van C", "123456", "nguyenvana@email.com"));

const handleLogin = function (email, password) {
  for (const user of data) {
    if (user.email === email && user.password === password) {
      return user;
    }
  }

  return `Thông tin đăng nhập không hợp lệ`;
};

const dataLogin = handleLogin("nguyenvana@email.com", "123456");
console.log(dataLogin);
const dataLogin2 = handleLogin("nguyenvanb@email.com");
console.log(dataLogin2);
