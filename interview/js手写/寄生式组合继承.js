function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log('my name is' + this.name + ".");
};
function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}
// Object.create()用于创建一个新对象，被创建的对象继承另一个对象的原型，在创建新对象时可以指定一些属性。
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayMyGrade = function () {
  console.log('my grade is' + this.grade + ".");
}

