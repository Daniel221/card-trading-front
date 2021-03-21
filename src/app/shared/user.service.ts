export class UserService{
    users=[];
    add(name,age){
        this.users.push({name,age});
    }
    edit(i,name,age){
        const u=this.users[i];
        this.users[i]={
            name:name?name:u.name,
            age:age?age:u.age
        }
    }
}