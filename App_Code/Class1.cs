using System;
using System.Collections.Generic;
using System.Web;
using System.Collections;

/// <summary>
/// Summary description for Employee
/// </summary>
public class Employee : IComparable
{
    private string cn;
    private string email;
    private string workPhone;
    private string homePhone;
    private string cellPhone;
    
    public Employee(string cn, string email, string workPhone, string homePhone, string cellPhone)
    {
        this.cn = cn;
        this.email= email;
        this.workPhone = workPhone;
        this.homePhone=homePhone;
        this.cellPhone=cellPhone;
    }

    public string getCn()
    {
       return this.cn;
    }
    
    public string getEmail()
    {
        return this.email;
    }

    public string getWorkPhone()
    {
        return this.workPhone;
    }

    public string getHomePhone()
    {
        return this.homePhone;
    }

    public string getCellPhone()
    {
        return this.cellPhone;
    }

    int IComparable.CompareTo(object obj)
    {
       Employee c=(Employee)obj;
       return String.Compare(this.cn,c.cn);

    }
}
