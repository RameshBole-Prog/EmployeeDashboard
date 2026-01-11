import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import {
    fullNameValidation,
    genderValidation,
    dateOfBirthValidation,
    stateValidation,
    statusValidation,
    profileImageValidation,
    validateImageFile,
    getMaxDateOfBirth,
    getMinDateOfBirth,
    trimFormData
} from '../../utils/employeeValidation';

const EmployeeForm = ({ employee, onSubmit, isEditMode, onCancel, mode = "create" }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setValue,
        watch,
        setError,
        clearErrors
    } = useForm({
        mode: "onChange",
        defaultValues: {
            fullName: '',
            gender: '',
            dob: '',
            state: '',
            status: 'active',
            profileImage: ''
        }
    });

    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);

    const isViewMode = mode === "view";

    // Set form values when employee data changes
    useEffect(() => {
        if (employee && (isEditMode || mode === "edit")) {
            const formValues = {
                fullName: employee.fullName || '',
                gender: employee.gender || '',
                dob: employee.dob || '',
                state: employee.state || '',
                status: employee.isActive ? 'active' : 'inactive',
                profileImage: employee.profileImage || ''
            };

            reset(formValues);
            setPreviewImage(employee.profileImage || '');
        }
    }, [employee, isEditMode, mode, reset]);

    const handleFormSubmit = async (data) => {
        if (onSubmit) {
            setLoading(true);
            try {
                const submitData = {
                    ...trimFormData(data),
                    isActive: data.status === 'active'
                };
                delete submitData.status;

                await onSubmit(submitData);
            } catch (error) {
                console.error('Form submission error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancelClick = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        clearErrors("profileImage");

        if (!file) {
            setValue("profileImage", "", { shouldValidate: true });
            setPreviewImage('');
            setError("profileImage", {
                type: "manual",
                message: "Profile Image is required"
            });
            return;
        }

        const imageError = validateImageFile(file);
        if (imageError) {
            setError("profileImage", {
                type: "manual",
                message: imageError
            });
            setValue("profileImage", "");
            setPreviewImage('');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setValue("profileImage", base64String, { shouldValidate: true });
            setPreviewImage(base64String);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setValue("profileImage", "", { shouldValidate: true });
        setPreviewImage('');
        setError("profileImage", {
            type: "manual",
            message: "Profile Image is required"
        });
    };

    const states = [
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
    ];


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row>
                {/* Full Name */}
                <Col md={6}>
                    <div className="form-group">
                        <label>Full Name <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                            placeholder="Enter full name"
                            disabled={isViewMode}
                            {...register("fullName", fullNameValidation(true))}
                        />
                        {errors.fullName && (
                            <div className="invalid-feedback d-block">
                                {errors.fullName.message}
                            </div>
                        )}
                    </div>
                </Col>

                {/* Gender */}
                <Col md={6}>
                    <div className="form-group mb-4">
                        <label>Gender <span className="text-danger">*</span></label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className={`form-check-input ${errors.gender ? "is-invalid" : ""}`}
                                    type="radio"
                                    id="gender-male"
                                    value="male"
                                    disabled={isViewMode}
                                    {...register("gender", genderValidation(true))}
                                />
                                <label className="form-check-label" htmlFor="gender-male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className={`form-check-input ${errors.gender ? "is-invalid" : ""}`}
                                    type="radio"
                                    id="gender-female"
                                    value="female"
                                    disabled={isViewMode}
                                    {...register("gender", genderValidation(true))}
                                />
                                <label className="form-check-label" htmlFor="gender-female">
                                    Female
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className={`form-check-input ${errors.gender ? "is-invalid" : ""}`}
                                    type="radio"
                                    id="gender-other"
                                    value="other"
                                    disabled={isViewMode}
                                    {...register("gender", genderValidation(true))}
                                />
                                <label className="form-check-label" htmlFor="gender-other">
                                    Other
                                </label>
                            </div>
                        </div>
                        {errors.gender && (
                            <div className="invalid-feedback d-block">
                                {errors.gender.message}
                            </div>
                        )}
                    </div>
                </Col>

                {/* Date of Birth */}
                <Col md={6}>
                    <div className="form-group">
                        <label>Date of Birth <span className="text-danger">*</span></label>
                        <input
                            type="date"
                            className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                            disabled={isViewMode}
                            max={getMaxDateOfBirth()}
                            min={getMinDateOfBirth()}
                            {...register("dob", dateOfBirthValidation(true))}
                        />
                        {errors.dob && (
                            <div className="invalid-feedback d-block">
                                {errors.dob.message}
                            </div>
                        )}
                    </div>
                </Col>

                {/* State */}
                <Col md={6}>
                    <div className="form-group mb-4">
                        <label>State <span className="text-danger">*</span></label>
                        <select
                            className={`form-control ${errors.state ? "is-invalid" : ""}`}
                            disabled={isViewMode}
                            {...register("state", stateValidation(true))}
                        >
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <div className="invalid-feedback d-block">
                                {errors.state.message}
                            </div>
                        )}
                    </div>
                </Col>

                {/* Status */}
                <Col md={6}>
                    <div className="form-group">
                        <label>Status <span className="text-danger">*</span></label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className={`form-check-input ${errors.status ? "is-invalid" : ""}`}
                                    type="radio"
                                    id="status-active"
                                    value="active"
                                    disabled={isViewMode}
                                    {...register("status", statusValidation(true))}
                                />
                                <label className="form-check-label" htmlFor="status-active">
                                    Active
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className={`form-check-input ${errors.status ? "is-invalid" : ""}`}
                                    type="radio"
                                    id="status-inactive"
                                    value="inactive"
                                    disabled={isViewMode}
                                    {...register("status", statusValidation(true))}
                                />
                                <label className="form-check-label" htmlFor="status-inactive">
                                    Inactive
                                </label>
                            </div>
                        </div>
                        {errors.status && (
                            <div className="invalid-feedback d-block">
                                {errors.status.message}
                            </div>
                        )}
                    </div>
                </Col>

                {/* Profile Image */}
                <Col md={6}>
                    <div className="form-group">
                        <label>
                            Profile Image <span className="text-danger">*</span>
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={`form-control mb-2 ${errors.profileImage ? "is-invalid" : ""
                                }`}
                            disabled={isViewMode}
                        />

                        <input
                            type="hidden"
                            {...register("profileImage", profileImageValidation(true))}
                        />

                        {errors.profileImage && (
                            <div className="invalid-feedback d-block">
                                {errors.profileImage.message}
                            </div>
                        )}

                        {previewImage && (
                            <div className="mt-2">
                                <Image
                                    src={previewImage}
                                    alt="Preview"
                                    rounded
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                    }}
                                    className="mb-2"
                                />
                                <br />
                                {!isViewMode && (
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={removeImage}
                                        type="button"
                                    >
                                        Remove Image
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </Col>

                {/* Buttons */}
                <Col xs={12} className="mt-4">
                    <div className="d-flex justify-content-end gap-2">
                        {!isViewMode && (
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : (isEditMode ? 'Update' : 'Add')} Employee
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancelClick}
                        >
                            {isViewMode ? 'Back' : 'Cancel'}
                        </button>
                    </div>
                </Col>
            </Row>
        </form>
    );
};

export default EmployeeForm;