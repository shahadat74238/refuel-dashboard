import { Avatar } from 'antd'

interface IuserInformation {
    profile_image?: string,
    name?: string,
    description?: string,
    email?: string,
    shape?: 'square' | 'circle'
}

function UserInformation({ profile_image, name, description, email, shape = 'circle' }: IuserInformation) {
    return (
        <div className='p-2'>
            <div className='flex items-center gap-1'>
                <Avatar shape={shape} size="large" alt={name} src={profile_image} />
                <div className='flex flex-col items-start'>
                    {name && <h1 className=' font-semibold capitalize'>{name}</h1>}
                    {description || email && <small className=' text-gray-500'>{description || email}</small>}
                </div>
            </div>
        </div>
    )
}

export default UserInformation