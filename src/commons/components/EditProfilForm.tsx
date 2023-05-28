import { useForm } from 'react-hook-form';
import { UpdateUser, UsertoREST } from '../types';
import { updateUser } from '@/services/userService';

type EditProfileFormProps = {
    user: UsertoREST;
};

const EditProfilForm: React.FC<EditProfileFormProps> = ({ user }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateUser>();

    return (
        <form name='editProfileForm' onSubmit={handleSubmit(updateUser)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    defaultValue={user.name}
                    {...register('name')}
                />
                {errors.name && (
                    <div className="invalid-feedback">{errors.name.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="text"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    defaultValue={user.email}
                    {...register('email')}
                />
                {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                    type="password"
                    className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                    id="currentPassword"
                    {...register('currentPassword', { required: 'Current Password is required' })}
                />
                {errors.currentPassword && (
                    <div className="invalid-feedback">{errors.currentPassword.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                    type="password"
                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                    id="newPassword"
                    {...register('newPassword', { required: 'New Password is required' })}
                />
                {errors.newPassword && (
                    <div className="invalid-feedback">{errors.newPassword.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                    type="password"
                    className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    {...register('confirmPassword', { required: 'Confirm your Password' })}
                />
                {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword.message}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="bio" className="form-label">Bio</label>
                <textarea className={`form-control ${errors.bio ? 'is-invalid' : ''}`} defaultValue={user.bio} {...register('bio')} />

                {errors.bio && (
                    <div className="invalid-feedback">{errors.bio.message}</div>
                )}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default EditProfilForm;
