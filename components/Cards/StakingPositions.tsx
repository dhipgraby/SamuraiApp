import { useState } from 'react';
import { stakeDataInPoolDto } from '@/dto/stakingDto';
import { convertTimestampToDate } from '@/helpers/stakingUtils';
import React from 'react';
import TapArrows from '../TapArrows';

const StakingPositions: React.FC<{ stakeData: stakeDataInPoolDto[] | undefined }> = ({ stakeData }) => {

  const [showPanel, setShowPanel] = useState(false)

  return (
    <>
      <div className='box ta-l'>
        <h1 className="text-md cursor-pointer"
          onClick={() => setShowPanel(prev => !prev)}>
          <TapArrows showPanel={showPanel} />
          Staking positions {(stakeData && stakeData.length) && `(${stakeData.length})`}
        </h1>
        <div>
        </div>
        {
          showPanel && stakeData && stakeData.length > 0 &&
          stakeData.map((item, index) => (
            <div key={index} className='box ta-l text-sm'>
              <ul>
                <li>
                  <div>
                    <p>Amount: {item.amount}</p>
                  </div>
                  <div>
                    <p>Claimed: {item.claimed ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p>End Time: {convertTimestampToDate(Number(item.endTime))}</p>
                  </div>
                  <div>
                    <p>StakeId: {item.id}</p>
                  </div>
                  <div>
                    <p>Pool: {item.pool}</p>
                  </div>
                  <div>
                    <p>Reward: {item.reward}</p>
                  </div>
                </li>

              </ul>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default StakingPositions;
