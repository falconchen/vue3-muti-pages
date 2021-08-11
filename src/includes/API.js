import utils from "./utils.js";

class API {

    constructor(homeUrl='https://d.cellmean.com',token=null) {
        this.homeUrl = homeUrl;
        this.token = token        
    }

    get url(){

        return {
            bubbles: this.homeUrl+'/api/bubbles',
            images: this.homeUrl+'/api/images',
            tokens:this.homeUrl+'/api/tokens',
        };
    }

    setToken(token) {
        this.token = token
        return this;
    }

    args(args) {
                
        let defaultArgs = {
            method: 'GET',
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Hi-Token": this.token,
            },                        
        };        

        return Object.assign(utils.clone(defaultArgs), args);        
    }

    /**
     * 处理API响应的错误消息
     * 
     * @param Object res 
     */
     apiErrorMsg(res) {
        
        let errorArr = []
        switch (typeof res.error) {
            case  'string':
                errorArr = [res.error];
                break;
            case  'object':                
                errorArr = utils.isArray(res.error)  
                            ? res.error 
                            : utils.combinObjectKV(res.error);
                break;
            default:
                return `${res.message}`;
        }        
        return `${res.message} ${errorArr.join("; ")}`;
    }


}
export default API