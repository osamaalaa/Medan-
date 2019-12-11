
let statements = {
    getUsers: {
    statement :`select emp.EMPLOYEE_ID,GETEMPNAME_LANG(emp.EMPLOYEE_ID,1,1)NAME_AR,
    GETEMPNAME_LANG(emp.EMPLOYEE_ID,1,2)NAME_EN,emp.EMPLOYEE_EMAIL,emp.MOBILE
    from EMPLOYEES emp
    where nvl(emp.DELETED,0)=0`,
             bindings: [],
             qstring: "",
             requireCommit: false
     }    
 }
   module.exports = statements ;
 
   
   