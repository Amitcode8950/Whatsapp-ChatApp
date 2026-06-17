import Users from './Users'
const User = () => {
    return (
        <div className='py-4'>
            <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>Message</h1>
            <div className='overflow-y-auto'
                style={
                    {maxHeight: "calc(75vh)"}
            }>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
                <Users/>
            </div>
        </div>
    )
}

export default User
