/**
 * Created by Ashee on 11-05-2016.
 */

function invokeRequest(req){
	if(window.localStorage.getItem("token")==null ){
        window.location.replace("/admin/login.html");
        return;
	}
    window.location = req+'?access_token=' + window.localStorage.getItem("token");
}

function postRequest(req, data){

}