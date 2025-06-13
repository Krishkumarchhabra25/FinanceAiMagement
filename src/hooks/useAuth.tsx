
const useAuth = ()=>{
    const user = localStorage.getItem('user');
    return {
        isAuthenticated: !user
    }
}

export default useAuth