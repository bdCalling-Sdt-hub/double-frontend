import { Form, Input, Select, Upload, Button, InputNumber } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useCreateProductMutation } from '../../../../redux/features/productApi';
import toast from 'react-hot-toast';
import { useGetAllCategoriesQuery } from '../../../../redux/features/categoryApi';
import formatSelectOptions from '../../../../utils/getSelectOptions';

const { TextArea } = Input;

const AddProduct = () => {
        const [form] = Form.useForm();
        const [createProduct, { isLoading }] = useCreateProductMutation();
        const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery([]);
        const categories = formatSelectOptions(categoriesData?.data);

        const handleSubmit = async (values) => {
                const formData = new FormData();

                values.images.fileList.forEach((file) => {
                        formData.append('image', file.originFileObj);
                });
                formData.append('data', JSON.stringify(values));
                try {
                        const res = await createProduct(formData).unwrap();
                        if (res.success) {
                                toast.success(res.message);
                                form.resetFields();
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                        console.log(error);
                }
        };

        return (
                <div className="p-8">
                        <h1 className="mb-6 text-2xl font-bold text-start">Add New Product</h1>
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
                                                                                if (value.fileList.length < 3) {
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
                                                        <Upload multiple beforeUpload={() => false}>
                                                                <Button icon={<InboxOutlined />}>Upload Images</Button>
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
                                                        rules={[{ required: true, message: 'Please add a brand!' }]}
                                                        label="Brand"
                                                        name="brand"
                                                        className="w-full"
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
                                                        className="text-2xl"
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
                                                                {
                                                                        required: true,
                                                                        message: 'Please enter the weight!',
                                                                },
                                                        ]}
                                                >
                                                        <Select
                                                                className="w-full"
                                                                placeholder="Select unit"
                                                                defaultValue={1}
                                                        >
                                                                <Select.Option value={'1 unit'}>1 Unit</Select.Option>
                                                                <Select.Option value={'2 units'}>2 Units</Select.Option>
                                                                <Select.Option value={'3 units'}>3 Units</Select.Option>
                                                                <Select.Option value={'4 units'}>4 Units</Select.Option>
                                                                <Select.Option value={'5 units'}>5 Units</Select.Option>
                                                        </Select>
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
                                                                disabled={categoriesLoading}
                                                                style={{ height: '42px' }}
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
                                                        <Select style={{ height: '42px' }} placeholder="Select status">
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
                                                {isLoading ? 'Adding...' : 'Add Product'}
                                        </Button>
                                </Form.Item>
                        </Form>
                </div>
        );
};

export default AddProduct;
