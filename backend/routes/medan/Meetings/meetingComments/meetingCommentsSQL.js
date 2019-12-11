
let statements = {
    
     insertComment: {
          statement: `
          insert into meeting_comments(
               comment_id,
               employee_id,
               agenda_id,
               minutes_id,
               user_comments
               )
               values
               (
               :comment_id,
               :employee_id,
               :agenda_id,
               :minutes_id,
               :user_comments
               )
          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
      },

      
     getCommentsOfMinutes: {
          statement: `
          select user_comments,employee_id,(select E.first_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME,
                    (select E.second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME,
                    (select E.first_name2 from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) FIRST_NAME_EN,
                    (select E.S_second_name from aot_gen.employees E where M.EMPLOYEE_ID = E.EMPLOYEE_ID) second_NAME_EN,
                     minutes_id , creation_date
                      from meeting_comments M
                    where  minutes_id in (select mom_id from meeting_minutes M where M.meeting_id = :meeting_id and deleted = 0)
                    and deleted = 0 
                    order by creation_date desc
          `,
          returns: [],
          bindings: [],
          qstring: "",
          requireCommit: true
      }

  }
  
  module.exports = statements ;
  