import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function AddItemForm({ onNewItem }) {
    // 1. Thêm state mới cho Danh mục và Ngày hết hạn
    const [newItem, setNewItem] = useState('');
    const [category, setCategory] = useState('Học tập'); 
    const [dueDate, setDueDate] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const submitNewItem = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const options = {
            method: 'POST',
            // 2. Gửi thêm dữ liệu category và dueDate xuống Backend
            body: JSON.stringify({ 
                name: newItem,
                category: category,
                dueDate: dueDate 
            }),
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/items', options)
            .then((r) => r.json())
            .then((item) => {
                onNewItem(item);
                setSubmitting(false);
                // 3. Reset form sau khi thêm thành công
                setNewItem('');
                setCategory('Học tập');
                setDueDate('');
            });
    };

    return (
        <Form onSubmit={submitNewItem}>
            <InputGroup className="mb-3">
                {/* 4. Thêm Form.Select cho phần phân loại */}
                <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ maxWidth: '180px' }}
                >
                    <option value="Học tập">Học tập chung</option>
                    <option value="Bài tập Java">Bài tập Java</option>
                    <option value="Học Nhập môn ">Học Nhập môn AI</option>
                    <option value="Hoạt động ">Hoạt động CLB HDC</option>
                    <option value="Giải trí">Giải trí</option>
                </Form.Select>

                {/* Ô nhập tên công việc cũ */}
                <Form.Control
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    type="text"
                    placeholder="Thêm công việc mới vào đây..."
                    aria-label="New item"
                />

                {/* 5. Thêm Form.Control type="date" cho ngày hết hạn */}
                <Form.Control
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    type="date"
                    aria-label="Due date"
                    style={{ maxWidth: '160px' }}
                />

                <Button
                    type="submit"
                    variant="primary"
                    disabled={!newItem.length}
                    className={submitting ? 'disabled' : ''}
                >
                    {submitting ? 'Đang thêm...' : 'Thêm việc'}
                </Button>
            </InputGroup>
        </Form>
    );
}

AddItemForm.propTypes = {
    onNewItem: PropTypes.func,
};