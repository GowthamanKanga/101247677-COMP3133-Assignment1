const Employee = require("./models/Employee");
const User = require("./models/User");

const resolvers = {
  Query: {
    login: async (parent, args) => {
      try {
        const user = await User.findOne({
          email: args.email,
          password: args.password,
        });
        if (user) {
          return {
            success: true,
            message: `Welcome back, ${user.username}!`,
            user: user,
          };
        } else {
          return {
            success: false,
            message: "Incorrect email or password. Please try again.",
            user: null,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "An error occurred. Please try again later.",
          user: null,
        };
      }
    },
    getEmployees: async () => {
      try {
        const employees = await Employee.find();
        return {
          success: true,
          message: `Found ${employees.length} employees.`,
          employees: employees,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "An error occurred. Please try again later.",
          employees: null,
        };
      }
    },
    getEmployeeById: async (parent, args) => {
      try {
        const employee = await Employee.findById(args.id);
        if (employee) {
          return {
            success: true,
            message: `Found employee ${employee.firstname} ${employee.lastname}.`,
            employee: employee,
          };
        } else {
          return {
            success: false,
            message: `Employee with ID ${args.id} not found.`,
            employee: null,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "An error occurred. Please try again later.",
          employee: null,
        };
      }
    },
  },
  Mutation: {
    signUp: async (parent, args) => {
      try {
        const newUser = new User({
          username: args.username,
          email: args.email,
          password: args.password,
        });
        await newUser.save();
        return {
          success: true,
          message: "New user created successfully.",
          user: newUser,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "An error occurred. Please try again later.",
          user: null,
        };
      }
    },
    addEmployee: async (parent, args) => {
      try {
        const newEmp = new Employee({
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          gender: args.gender,
          salary: args.salary,
        });
        await newEmp.save();
        return {
          success: true,
          message: "New employee added successfully.",
          employee: newEmp,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "An error occurred. Please try again later.",
          employee: null,
        };
      }
    },
    updateEmployeeById: async (parent, args) => {
      try {
        const emp = await Employee.findById(args.id);
        if (emp) {
          if (args.firstname) {
            emp.firstname = args.firstname;
          }
          if (args.lastname) {
            emp.lastname = args.lastname;
          }
          if (args.email) {
            emp.email = args.email;
          }
          if (args.gender) {
            emp.gender = args.gender;
          }
          if (args.salary) {
            emp.salary = args.salary;
          }
          await emp.save();
          return {
            success: true,
            message: `Employee with ID ${args.id} updated successfully.`,
            employee: emp,
          };
        } else {
          return {
            success: false,
            message: `Employee with ID ${args.id} not found.`,
            employee: null,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "An error occurred. Please try again later.",
          employee: null,
        };
      }
    },
    deleteEmployeeById: async (parent, args) => {
      try {
        const emp = await Employee.findById(args.id);
        if (emp) {
          await emp.remove();
          return {
            success: true,
            message: `Employee with ID ${args.id} deleted successfully.`,
            employee: emp,
          };
        } else {
          return {
            success: false,
            message: `Employee with ID ${args.id} not found.`,
            employee: null,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          success: false,
          message: "An error occurred. Please try again later.",
          employee: null,
        };
      }
    },
  },
};

module.exports = resolvers;
