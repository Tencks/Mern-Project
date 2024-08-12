import { ENV } from '../Utils';


export class User {
    baseApi = ENV.BASE_API;

    async getMe(accessToken){
        try{
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            const params = {
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();

            //if (response.status !== 201) throw result; REVIENTA LA APP Y NO ANDA NINGUN LOGIN
            if (response.status !== 200) throw result; //REVIENTA EL CLOSE()

            return result;

        }catch (error){
            throw error;
        }
    }


    async createUser(accessToken, data){
        try{
            const formData = new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key, data[key])
            });

            if(data.fileAvatar){
                formData.append('avatar', data.fileAvatar)
            }
            console.log(formData);
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
            const params = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            //if(response.status !== 201) throw result; REVIENTA CON EL 201
            if(response.status !== 201) throw result; //REVIENTA EL CLOSE()

            return result;

        }catch (error){
            throw error;
        }
    }

    async getUsers(accessToken, active = undefined ){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
            const params = {
                
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;


        } catch (error) {
            throw error;
        }
    }


}