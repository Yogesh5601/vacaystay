import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loader = ({ loading, size, color }: any) => {
    return (
        <div>
            {loading && (
                <div className="fixed inset-0 z-50 bg-white bg-opacity-80"></div>
            )}
            <div className={`absolute inset-0 flex justify-center items-center ${loading ? 'z-10' : 'z-[-10]'}`}>
                <PropagateLoader
                    color={color}
                    loading={loading}
                    size={size}
                    aria-label="Loading Spinner"
                />
            </div>
        </div>
    );
};

Loader.defaultProps = {
    loading: true,
    size: 20,
    color: '#fffff', // Blue color
};

export default React.memo(Loader);
