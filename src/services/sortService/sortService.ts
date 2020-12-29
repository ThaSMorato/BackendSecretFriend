export interface SortInterface{
    id: string;
    name: string;
    email: string;
    sortedName: string;
    sortedEmail: string;
}

export interface UserInterface{
    id: string;
    name: string;
    email: string;
}

export default {
    SortUsers(users: Array<UserInterface>): Promise<Array<SortInterface>>{
        return new Promise((resolve, reject) => {
            let ret: Array<SortInterface> = [];
            let sorted = users;
            let hasErrors: boolean = true;
            while (hasErrors){
                users.forEach((user: UserInterface) => {
                    let possibleSortedUsers = sorted.filter((possibleUser) => possibleUser.id != user.id);
                    if (possibleSortedUsers.length > 0){
                        let index = Math.floor(Math.random() * (possibleSortedUsers.length - 1));
                        let sortedUser: UserInterface = possibleSortedUsers[index];
                        sorted = sorted.filter(nextPossbleSortedUser => nextPossbleSortedUser.id != sortedUser.id);
                        ret.push({
                            ...user,
                            sortedName: sortedUser.name,
                            sortedEmail: sortedUser.email
                        })
                        hasErrors = false;
                    }else{
                        hasErrors = true;
                        ret = [];
                        sorted = users;
                    }
                })
            }    
            resolve(ret);
        })
 
    }
}