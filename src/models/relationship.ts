import Teacher from "./teacher.model";
import Class from "./class.model";
import Student from "./student.model";
import Parent from "./parent.model";


Teacher.hasMany(Class, { foreignKey: 'teacher_id' });
Class.belongsTo(Teacher, { foreignKey: 'teacher_id' });

Class.hasMany(Student, { foreignKey: 'class_id' });
Student.belongsTo(Class, { foreignKey: 'class_id' });

// One to One
Student.hasOne(Parent, { foreignKey: 'student_id' });
Parent.belongsTo(Student, { foreignKey: 'student_id' });
