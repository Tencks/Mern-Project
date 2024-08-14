import React, {useState, useEffect} from 'react'
import { Loader } from 'semantic-ui-react';
import {map, size} from 'lodash'
import { Newsletter } from '../../../../api'
import { useAuth } from '../../../../hooks';
import { EmailItem } from '../EmailItem';

const newsletterController = new Newsletter();
export function ListEmails() {
    const [emails, setEmails] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
      (async () =>{
        try {
            const response = await newsletterController.getEmails(accessToken);
            console.log(response.emailStored.docs);
            setEmails(response.emailStored.docs)
        } catch (error) {
            console.error(error);
            
        }
      })()
       
    }, [])
    
    if(!emails) return <Loader active inline='centered' />
    if(size(emails) === 0) return 'No hay emails registrados';

    

  return (
    <div className='list-emails'>
        {map(emails, (email) =>(
            <EmailItem key={email._id} email={email} />
        ))}
    </div>
  )
}
