import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'


const useProvidersAuthentication = () => {
    const { toast } = useToast()

    const loginWithProvider = async (provider: string) => {
        try {
            await signIn(provider)
        } catch (error){
            toast({
                title: 'There was a problem',
                description: `There was an error logging in with ${provider}`,
                variant: 'destructive'
                
            })
        } 
    }
    return { loginWithProvider }
}

export default useProvidersAuthentication;


    