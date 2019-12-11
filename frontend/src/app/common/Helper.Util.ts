/**
 * Static helper class with static function
 * 
 * *usage: HelperUtil.<function-name>(args)
 */
export class HelperUtil {

    private static readonly FLAG_REGEX: RegExp = /.*FLAG.*/


    /**
     * * Server database stores boolean values as 1 and 0
     * * Ant design checkbox only takes value as true and false (Issue: https://github.com/NG-ZORRO/ng-zorro-antd/issues/3152)
     * * This function is to convert all boolean values to respective 0's and 1's
     * 
     * *GOTCHAS : The boolean key must have `FLAG` in the name of the key 
     * @example 
     * Input  { SOME_FLAG:true, SOME_OTHER_FLAG:false}
     * Output { SOME_FLAG:1   , SOME_OTHER_FLAG: 0   }
     * 
     * @param body 
     */
    public static parseBodyForServer(body: object): object {
        let result = { ...body };

        const TRUE_VALUE_SERVER: number = 1;
        const FALSE_VALUE_SERVER: number = 0;
        for (var key in result) {
            let isKeyBooleanType: boolean = this.FLAG_REGEX.test(key);
            if (isKeyBooleanType) {
                result[key] = result[key] ? TRUE_VALUE_SERVER : FALSE_VALUE_SERVER
            }
        }

        return result;
    }


    /**
     * * Server database stores boolean values as 1 and 0
     * * Ant design checkbox only takes value as true and false (Issue: https://github.com/NG-ZORRO/ng-zorro-antd/issues/3152)
     * * This function is to convert all boolean values(0,1) to respective  and true and false
     * 
     * *GOTCHAS : The boolean key must have `FLAG` in the name of the key 
     * @example 
     * Input  { SOME_FLAG:1, SOME_OTHER_FLAG:0}
     * Output { SOME_FLAG:true   , SOME_OTHER_FLAG: false  }
     * @param body 
     */
    public static parseBodyForClient(body: object): object {
        let result = { ...body };
        for (var key in result) {
            let isKeyBooleanType: boolean = this.FLAG_REGEX.test(key);
            if (isKeyBooleanType) {
                result[key] = result[key] == 1 ? true : false
            }
        }

        return result;
    }

    /**
   * Converts flat array to tree heirarchy
   * @courtesy : https://stackoverflow.com/a/22367819/7312043
   * @param list : flat array with parent and child ids
   * @param idAttr : id name
   * @param parentAttr : parent id name
   * @param childrenAttr : child key name
   */
    public static treeify(list: any[], idAttr: string, parentAttr: string, childrenAttr: string) {
        if (!idAttr) idAttr = 'id'
        if (!parentAttr) parentAttr = 'parent'
        if (!childrenAttr) childrenAttr = 'children'
        try {
            var treeList = []
            var lookup = {}
            list.forEach(function (obj) {
                lookup[obj[idAttr]] = obj
                obj[childrenAttr] = []
                obj['key'] = obj[idAttr]
                obj['title'] = obj['AR_NAME'] ? obj['AR_NAME'] : obj['EN_NAME']
            })
            list.forEach(function (obj) {
                if (obj[parentAttr] != null && obj.PROJ_ID != null) {
                    lookup[obj[parentAttr]][childrenAttr].push(obj)
                } else {
                    treeList.push(obj)
                }
            })

            return treeList
            
        } catch (e) {
            console.error(e);
            console.error("THE TREE IS BROKEN. MAKE SURE THE TREE HAS HEIRARCHY.")
        }
    }

    /**
     * To tranform Javascript date to string date(25-January-2019)
     * @param date Javascript date
     */
    public static formatDate(date) {
        if (!date) return date
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];


        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        return day + '-' + monthNames[monthIndex] + '-' + year;
        // return hours + '-' +  minutes;
    }
    public static formatDatetime(date) {
        if (!date) return date

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var cminutes = minutes.toString();


        if (cminutes.length == '1') {
            var fmin = "0" + minutes;
        }
        else {
            fmin = minutes;
        }

        return hours + ':' + fmin;
    }

}