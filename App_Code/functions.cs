using System;
using WebMatrix.Data;

public class myFuncs
{
       
    //Generate a random password
    public static string randomPassword(int length) {
        //Declare our variables
        string alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789.0123456789-+*/!@#$%^&*-_=+";
        Char[] pass = new Char[length];
        Random rnd = new Random();
        int alphaLength = alphabet.Length - 1; //put the length - 1
        int num;

        //Generate each letter
        for (int i = 0; i < length; i++) {
            //New Random Number
            num = rnd.Next(0, alphaLength);
            pass.SetValue(alphabet[num], i);
        }

        return new string(pass);
    }

    //Generate a unique user ID
    public static string uniqueID(string first, string last) {
            //Keep track of chars
	        int i = 0;
	        int j = 5;
	
	        //start off as true
	        bool exists = true;	

            //User string
            string user = "";

            //Database with userID's
            var db = Database.Open("GP");
            var tmp = Database.Open("kinglandDatabase");
            	
	        //For people with short last names. -- to ensure they have a 5 digit userID
	        if ( (last.Length) < 4 ) {
		        i += (4 - last.Length );
	        }
	
	        //Generate a unique user ID
	        while ( exists ) {
		        //Grab one more letter from the first name, one less from the last.
		        i++;
		        j--;

		        //Create an ID from first/last name
		        user = first.Substring(0, i) + last.Substring(0, j);

                user = user.ToUpper();

		        //Check if the ID is in the master or temp tables. If not, try the next combination
		        var inGP = db.QuerySingle("SELECT * FROM UPR00100 WHERE EMPLOYID = @0", user);
                var inTMP = tmp.QuerySingle("SELECT * FROM users WHERE user = @0", user);


		        if ( inGP == null && inTMP == null ) {
		            exists = false;
		        }
	        }
	
	        return user.ToUpper();
	        //------------------------------------------------
        }  
}