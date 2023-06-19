import React from 'react';
import { Footer } from 'antd/es/layout/layout';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

const pad = '10px';
const colorRed = '#EC4242';
const textSizeSmall = '15px';
const textSizeBig = '20px';
const wh = 'white';

export default function FooterElement() {
  const { lg } = useBreakpoint();

  const textSize = lg ? textSizeBig : textSizeSmall;

  return (
    <Footer style={{
      textAlign: 'center',
      padding: '20px 0 0 0',
      fontSize: textSize,
      fontWeight: 'bold',
    }}
    >
      <div style={{ padding: pad, backgroundColor: colorRed, color: wh }}>
        <img src="/images/Delaware-logo_white.png" alt="Logo" width={200} />
        <div>
          support@shop.delaware.be
          <br />
          (+32) 02 83 88 17
        </div>
      </div>
      <div style={{ padding: pad, color: colorRed, backgroundColor: '#fdecec' }}>
        &copy; delaware 2023
      </div>
    </Footer>
  );
}
