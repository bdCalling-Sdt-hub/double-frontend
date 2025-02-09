import { useState, useEffect } from 'react';
import { Form, Input, Select, Upload, Button, InputNumber } from 'antd';

import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/productApi';
import toast from 'react-hot-toast';
import { useGetAllCategoriesQuery } from '../../../../redux/features/categoryApi';
import formatSelectOptions from '../../../../utils/getSelectOptions';
import { useParams } from 'react-router';
import getImageUrl from '../../../../utils/getImageUrl';

const { TextArea } = Input;

const EditProducts = () => {
        const params = useParams();
        const [form] = Form.useForm();

        const { data: product } = useGetProductByIdQuery(params.id);
        const [updateProduct, { isLoading }] = useUpdateProductMutation();
        const { data: categoriesData } = useGetAllCategoriesQuery([]);
        const categories = formatSelectOptions(categoriesData?.data);

        const [fileList, setFileList] = useState([]);
        const [removedImages, setRemovedImages] = useState([]);

        useEffect(() => {
                if (product) {
                        // Pre-fill the form with the product data
                        form.setFieldsValue({
                                name: product.name,
                                price: product.price,
                                weight: product.weight,
                                description: product.description,
                                category: product.category._id,
                                status: product.status,
                                discount: product.discount,
                                quantity: product.quantity,
                                brand: product.brand,
                        });

                        const initialFileList = product.image.map((imgUrl) => ({
                                uid: imgUrl,
                                name: imgUrl,
                                status: 'done',
                                url: getImageUrl(imgUrl),
                        }));
                        setFileList(initialFileList);
                }
        }, [product, form]);
        const handleRemove = (file) => {
                setRemovedImages((prev) => [...prev, file.uid]);
                const newFileList = fileList.filter((item) => item.uid !== file.uid);
                setFileList(newFileList);
        };

        const handleUploadChange = ({ file, fileList: newFileList }) => {
                // Handle new file upload and update the file list
                if (file.status === 'done') {
                        newFileList[newFileList.length - 1].url = URL.createObjectURL(file.originFileObj);
                }
                setFileList(newFileList);
        };
        const handleSubmit = async (values) => {
                values.imagesToDelete = removedImages;
                const formData = new FormData();

                if (values?.images?.fileList.length > 0) {
                        values.images.fileList.forEach((file) => {
                                formData.append('image', file.originFileObj);
                        });
                }
                formData.append('data', JSON.stringify(values));
                const updateProductData = {
                        data: formData,
                        id: params.id,
                };
                try {
                        const res = await updateProduct(updateProductData).unwrap();
                        if (res.success) {
                                toast.success(res.message);
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };

        return (
                <div className="p-8">
                        <h1 className="mb-6 text-2xl font-bold text-start">Edit Product</h1>
                        <Form
                                initialValues={{ quantity: '1 unit' }}
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                        >
                                <div className="grid grid-cols-2 gap-8">
                                        {/* Left Side */}
                                        <div className="space-y-4">
                                                {/* Image Upload */}
                                                <Form.Item
                                                        label="Product Images"
                                                        name="images"
                                                        rules={[
                                                                {
                                                                        required: true,
                                                                        message: 'Please upload at least 3 product images!',
                                                                        validator: (_, value) => {
                                                                                if (value?.fileList.length < 3) {
                                                                                        return Promise.reject(
                                                                                                new Error(
                                                                                                        'Please upload at least 3 product images!',
                                                                                                ),
                                                                                        );
                                                                                }
                                                                                return Promise.resolve();
                                                                        },
                                                                },
                                                        ]}
                                                >
                                                        <Upload
                                                                multiple
                                                                fileList={fileList}
                                                                onChange={handleUploadChange}
                                                                onRemove={handleRemove}
                                                                beforeUpload={() => false} // Prevent auto-upload
                                                                style={{
                                                                        minHeight: '150px',
                                                                        padding: '20px',
                                                                        border: '2px dashed #d9d9d9',
                                                                }}
                                                        >
                                                                <div className="ant-upload-text">
                                                                        {fileList.length > 0 ? (
                                                                                <div className="flex flex-wrap gap-2 mt-4">
                                                                                        {fileList.map((file, index) => (
                                                                                                <div key={index}>
                                                                                                        <img
                                                                                                                src={
                                                                                                                        file.url ||
                                                                                                                        URL.createObjectURL(
                                                                                                                                file.originFileObj,
                                                                                                                        )
                                                                                                                }
                                                                                                                alt={`Product ${
                                                                                                                        index +
                                                                                                                        1
                                                                                                                }`}
                                                                                                                width={
                                                                                                                        80
                                                                                                                }
                                                                                                                className="rounded-md !w-20 !h-20 object-cover"
                                                                                                        />
                                                                                                </div>
                                                                                        ))}
                                                                                </div>
                                                                        ) : (
                                                                                'Click or drag images here to upload'
                                                                        )}
                                                                </div>
                                                        </Upload>
                                                </Form.Item>

                                                {/* Quantity */}
                                                {/* <Form.Item
                                                        label="Quantity"
                                                        name="quantity"
                                                        rules={[
                                                                {
                                                                        required: true,
                                                                        message: 'Please select a quantity!',
                                                                },
                                                        ]}
                                                >
                                                        <Input className="" placeholder="Enter quantity" />
                                                </Form.Item> */}

                                                {/* Brand Input */}
                                                <Form.Item
                                                        label="Brand"
                                                        name="brand"
                                                        rules={[{ required: true, message: 'Please add a brand!' }]}
                                                >
                                                        <Input className="" placeholder="Enter brand name" />
                                                </Form.Item>

                                                {/* Description */}
                                                <Form.Item
                                                        label="Description"
                                                        name="description"
                                                        rules={[
                                                                {
                                                                        required: true,
                                                                        message: 'Please add a product description!',
                                                                },
                                                        ]}
                                                >
                                                        <TextArea rows={6} placeholder="Enter product description" />
                                                </Form.Item>
                                        </div>

                                        {/* Right Side */}
                                        <div className="space-y-4">
                                                {/* Product Name */}
                                                <Form.Item
                                                        label="Product Name"
                                                        name="name"
                                                        rules={[
                                                                {
                                                                        required: true,
                                                                        message: 'Please enter the product name!',
                                                                },
                                                        ]}
                                                >
                                                        <Input className="" placeholder="Enter product name" />
                                                </Form.Item>

                                                {/* Regular Price */}
                                                <Form.Item
                                                        label="Regular Price"
                                                        name="price"
                                                        rules={[
                                                                {
                                                                        required: true,
                                                                        message: 'Please enter the regular price!',
                                                                },
                                                        ]}
                                                >
                                                        <InputNumber
                                                                className="w-full"
                                                                placeholder="Enter regular price"
                                                                prefix="$"
                                                                min={0}
                                                        />
                                                </Form.Item>

                                                {/* Weight */}
                                                <Form.Item
                                                        label="Weight"
                                                        name="weight"
                                                        rules={[
                                                                { required: true, message: 'Please enter the weight!' },
                                                        ]}
                                                >
                                                        <InputNumber
                                                                className="w-full"
                                                                placeholder="Enter weight (in pounds)"
                                                                min={0}
                                                        />
                                                </Form.Item>

                                                {/* Discount */}
                                                {/* <Form.Item label="Discount (Optional)" name="discount">
                                                        <InputNumber
                                                                className="w-full"
                                                                placeholder="Enter discount amount"
                                                                prefix="$"
                                                                min={0}
                                                        />
                                                </Form.Item> */}

                                                {/* Category Dropdown */}
                                                <Form.Item
                                                        label="Category"
                                                        name="category"
                                                        rules={[
                                                                {
                                                                        required: true,
                                                                        message: 'Please select a category!',
                                                                },
                                                        ]}
                                                >
                                                        <Select
                                                                style={{ height: '55px' }}
                                                                placeholder="Select category"
                                                        >
                                                                {categories.map((category) => (
                                                                        <Select.Option
                                                                                key={category.value}
                                                                                value={category.value}
                                                                        >
                                                                                {category.label}
                                                                        </Select.Option>
                                                                ))}
                                                        </Select>
                                                </Form.Item>

                                                {/* Status */}
                                                <Form.Item
                                                        label="Status"
                                                        name="status"
                                                        rules={[
                                                                {
                                                                        required: true,
                                                                        message: 'Please select the product status!',
                                                                },
                                                        ]}
                                                >
                                                        <Select style={{ height: '55px' }} placeholder="Select status">
                                                                <Select.Option value="In Stock">In Stock</Select.Option>
                                                                <Select.Option value="Out of Stock">
                                                                        Out of Stock
                                                                </Select.Option>
                                                        </Select>
                                                </Form.Item>
                                        </div>
                                </div>

                                {/* Submit Button */}
                                <Form.Item>
                                        <Button
                                                htmlType="submit"
                                                className="w-full bg-[#173616] text-white py-7 text-xl mt-6"
                                        >
                                                {isLoading ? 'Updating...' : 'Update Product'}
                                        </Button>
                                </Form.Item>
                        </Form>
                </div>
        );
};

export default EditProducts;
