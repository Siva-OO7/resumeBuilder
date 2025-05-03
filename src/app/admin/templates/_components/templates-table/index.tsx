'use client'

import { ITemplate } from '@/interface'
import { Button, Table, Modal } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { Pen, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteTemplateById } from '@/server-actions/templates';
import toast from 'react-hot-toast';

function TemplateTable({ data }: { data: ITemplate[] }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingId, setLoadingId] = useState<string | null>(null); // Track loading state for individual actions
    const [isModalOpen, setIsModalOpen] = useState(false); // Changed 'isModalVisible' to 'isModalOpen'
    const [templateToDelete, setTemplateToDelete] = useState<string | null>(null); // Store ID of template to delete
    const router = useRouter();

    const onDelete = async (id: string) => {
      try {
        setLoadingId(id); // Set the current template as loading
        const response = await deleteTemplateById(id);
        if(response.success){
          toast.success("Template deleted successfully");
        } else {
          toast.error(response.message);
        } 
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoadingId(null); // Reset loading state
        setIsModalOpen(false); // Close the modal after delete action
      }
    };

    const handleDeleteClick = (id: string) => {
      setTemplateToDelete(id); // Set the template ID for deletion
      setIsModalOpen(true); // Show the confirmation modal
    };

    const handleModalOk = () => {
      if (templateToDelete) {
        onDelete(templateToDelete); // Call onDelete with the template ID
      }
    };

    const handleModalCancel = () => {
      setIsModalOpen(false); // Close the modal without deleting
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name', // Added key for better table performance
      },
      {
        title: 'Is Only For Subscribers',
        dataIndex: 'isOnlyForSubscribers',
        key: 'isOnlyForSubscribers',
        render: (value: any) => value ? 'Yes' : 'No'
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: string) => dayjs(value).format("MMM DD, YYYY hh:mm A")
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: ITemplate) => {
          return (
            <div className='flex gap-5'>
              <Button 
                size='small' 
                onClick={() => handleDeleteClick(record._id)} 
                loading={loadingId === record._id} // Show loading for delete button of the row being deleted
                danger
              >
                <Trash2 size={12} />
              </Button>
              <Button 
                size='small' 
                onClick={() => router.push(`/admin/templates/edit/${record._id}`)}
              >
                <Pen size={12} />
              </Button>
            </div>
          );
        }
      }
    ];

    return (
      <div>
        <Table 
          columns={columns} 
          dataSource={data} 
          loading={isLoading} 
          pagination={{ pageSize: 10 }}  // Added pagination (optional, adjust pageSize as needed)
          locale={{ emptyText: 'No templates available' }}  // Custom empty state
          rowKey="_id"  // Added rowKey for better performance with dynamic rows
        />

        {/* Modal for confirmation */}
        <Modal
          title="Are you sure you want to delete this template?"
          open={isModalOpen}  // Changed 'visible' to 'open'
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Yes"
          cancelText="No"
        >
          <p>This action cannot be undone.</p>
        </Modal>
      </div>
    );
}

export default TemplateTable;

