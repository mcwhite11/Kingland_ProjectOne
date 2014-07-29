using System;
using System.Data;
using System.Net;
using System.IO;
using System.DirectoryServices;
using System.Security.Principal;
using System.DirectoryServices.AccountManagement;
using System.Collections;
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

        
	//shift value
	public static int shiftValue( int num, int shift) {
		int final = 0;
		int x = 1;
		int iteration = 0;
        int val;
		//While our number hasn't been depleted
		while ( num > 0 ) {
			iteration++;
		
			//Grab the smallest digit
			val = num % 10;
			
			//Subtract it from our number
			num -= val;
			
			//Caesar Cypher Shift the value by some number
			val = (shift + val) * x;
			
			//Reset value so 14 = 4, not 14 and ect.
			if ( (val / x) > 9 ) {
				val -= 10 * x;
			}
			
			//Add this shifted number to our final number
			final += val; 
			
			//Move to next position
			x *= 10;
			num = num / 10;
			
			//Modify next shift
			if ( iteration % 2 == 0 ) {
				shift *= 2;
			} else {
				shift /= 2;
			}
		}
		
		return final;
	}
	
	//unshift value
	public static int unshiftValue( int num, int shift) {
		int final = 0;
		int x = 1;
		int iteration = 0;
        int val;
		//While our number hasn't been depleted
		while ( num > 0 ) {
			iteration++;
			//Grab the smallest digit
		    val = num % 10;
			
			//Subtract it from our number
			num -= val;
			
			//Caesar Cypher Shift the value by some number
			val = (val - shift) * x;
			
			//Reset value so 14 = 4, not 14 and ect.
			if ( (val / x) < 0 ) {
				val += 10 * x;
			}
			
			//Add this shifted number to our final number
			final += val; 
			
			//Move to next position
			x *= 10;
			num = num / 10;
			
			//Modify next shift
			if ( iteration % 2 == 0 ) {
				shift *= 2;
			} else {
				shift /= 2;
			}
		}
		
		return final;
	}

    //Given an Employee ID - Returns that users Email address.
    public static string getEmail(string EMPLOYID) {
        EMPLOYID = EMPLOYID.ToUpper();

        //Connect to DB and Open
        var gp = Database.Open("GP");

        //Now get their first/last name/location
        var loc = gp.QuerySingle("SELECT LOCATNID, NICKNAME FROM UPR00100 WHERE EMPLOYID = @0", EMPLOYID);
        
        //Determine location
        string location = loc.LOCATNID.Trim();

        //Convert from GP to AD terms
        if ( location == "AM" ) {
            location = "Ames";
        } else if ( location == "CL" ) {
            location = "Clear Lake";
        } else if ( location == "DA" ) {
            location = "China";
        } else if ( location == "RO" ) {
            location = "Clear Lake";
        } else if ( location == "LM" ) {
            location = "Lake Mills";
        }

        //Create a search context/specific location for this search
        PrincipalContext ad = new PrincipalContext(ContextType.Domain, "10.1.40.50", "ou=" + @location + ", DC=KINGLAND, DC=CC");
    
        //Returns a "user principal" in that DN?
        UserPrincipal u = new UserPrincipal(ad);

        //Search filter - For filters reference http://msdn.microsoft.com/en-us/library/system.directoryservices.accountmanagement.userprincipal_properties(v=vs.110).aspx
        u.SamAccountName = EMPLOYID;

        //"Search Engine Object" of sorts, based on filters specified above
        PrincipalSearcher search = new PrincipalSearcher(u); 

        //Returns essentially a user object based on that filter
        UserPrincipal result =  (UserPrincipal) search.FindOne();

        //Now we go underneath to the LDAP level to grab all attributes not covered by User Principal (i.e, Display name, ect.)
        DirectoryEntry lowerLdap = (DirectoryEntry)result.GetUnderlyingObject();

        //Grab the attributes of that user for printing or manipulation
        //To find these, go in Active Directory controls and find a user -- then find the "Attribute Editor" which will tell you the attribute's names to be used below
        return (string) lowerLdap.Properties["mail"].Value;
    }

    //Given an Employee ID - Returns that users DN.
    public static string getDN(string EMPLOYID) {
        EMPLOYID = EMPLOYID.ToUpper();

        //Connect to DB and Open
        var gp = Database.Open("GP");

        //Now get their Location, Nickname, Last, First from GP
        var loc = gp.QuerySingle("SELECT LOCATNID  FROM UPR00100 WHERE EMPLOYID = @0", EMPLOYID);
        
        //Determine location
        string location = loc.LOCATNID.Trim();

        //Convert from GP to AD terms
        if ( location == "AM" ) {
            location = "Ames";
        } else if ( location == "CL" ) {
            location = "Clear Lake";
        } else if ( location == "DA" ) {
            location = "China";
        } else if ( location == "RO" ) {
            location = "Clear Lake";
        } else if ( location == "LM" ) {
            location = "Lake Mills";
        }

        //Create a search context/specific location for this search
        PrincipalContext ad = new PrincipalContext(ContextType.Domain, "10.1.40.50", "ou=" + @location + ", DC=KINGLAND, DC=CC");
    
        //Returns a "user principal" in that DN?
        UserPrincipal u = new UserPrincipal(ad);

        //Search filter - For filters reference http://msdn.microsoft.com/en-us/library/system.directoryservices.accountmanagement.userprincipal_properties(v=vs.110).aspx
        u.SamAccountName = EMPLOYID;

        //"Search Engine Object" of sorts, based on filters specified above
        PrincipalSearcher search = new PrincipalSearcher(u); 

        //Returns essentially a user object based on that filter
        UserPrincipal result =  (UserPrincipal) search.FindOne();

        //Return DN
        return (string) result.DistinguishedName;
    }


    //Given a directory, deletes all relevant files in the directory and that folder.
    public static bool DeleteDirectory(string directory) {
        string fileDirectory = "ftp://newhire.kingland.com/PDFStorage/" + directory + "/" + directory;
        string actDirectory = "ftp://newhire.kingland.com/PDFStorage/" + directory;
        string FTPRequestType = "file";

        //Array of each file
        Uri[] files = {  new Uri(fileDirectory + "AdditionalInformation.pdf" ), new Uri(fileDirectory + "DirectDeposit.pdf" ),
                        new Uri(fileDirectory + "EmployeeHandbook.pdf" ), new Uri(fileDirectory + "SafeHarbor.pdf" ),
                        new Uri(fileDirectory + "StudentVerification.pdf" ), new Uri(fileDirectory + "TechnologyAgreement.pdf" ) };

        //Delete each file
        foreach ( Uri file in files ) {
            DeleteFileOnServer(file, FTPRequestType);
        }

        FTPRequestType = "directory";
        DeleteFileOnServer(new Uri(actDirectory), FTPRequestType );

        return true;
    }


    //Deletes a file on a server -- Used from Msdn Example code
    public static bool DeleteFileOnServer(Uri serverUri, string FTPRequestType) {

        try {
            //Set the file
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(serverUri);

            //Specificy Credentials
            request.Credentials = new NetworkCredential("newhire@kingland.com", "K1ngl@nD!"); 

            if ( FTPRequestType.Equals("file") ) {
                request.Method = WebRequestMethods.Ftp.DeleteFile;
            } else if ( FTPRequestType.Equals("directory") ) {
                request.Method = WebRequestMethods.Ftp.RemoveDirectory;
            }
            
            FtpWebResponse response = (FtpWebResponse)request.GetResponse();
            response.Close();

            return true;
        } 
           
        catch (WebException W) {
            return true;
        }

    }
        
          
}