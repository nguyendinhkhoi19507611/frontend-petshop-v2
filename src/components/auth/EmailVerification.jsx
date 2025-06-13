import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import api from '../../services/api';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Mã xác thực không hợp lệ.');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      const response = await api.get(`/auth/verify?token=${token}`);
      setStatus('success');
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Xác thực email thất bại.');
    }
  };

  const resendVerification = async () => {
    const email = searchParams.get('email');
    if (!email) {
      setMessage('Không tìm thấy địa chỉ email.');
      return;
    }

    try {
      const response = await api.post(`/auth/resend-verification?email=${email}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Không thể gửi lại email xác thực.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="h-16 w-16 text-primary-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Đang xác thực email...</h2>
            <p className="text-gray-600">Vui lòng đợi trong giây lát.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác thực thành công!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Bạn sẽ được chuyển hướng đến trang đăng nhập sau 5 giây...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác thực thất bại</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={resendVerification}
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition"
            >
              Gửi lại email xác thực
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification; 