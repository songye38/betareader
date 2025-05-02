const LoadingSpinner = () => (
    <div style={{ padding: '32px', textAlign: 'center' }}>
        <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #ccc',
            borderTop: '4px solid #4F46E5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto',
        }} />
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}
        </style>
        <div style={{ marginTop: '12px', fontSize: '16px', color: '#888' }}>
            불러오는 중이에요...
        </div>
    </div>
);

export default LoadingSpinner;
