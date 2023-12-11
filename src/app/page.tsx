import { Account } from '../components/Account'
import { All_votes} from '../components/All_votes'
import { Balance } from '../components/Balance'
import { BlockNumber } from '../components/BlockNumber'
import { ConnectButton } from '../components/ConnectButton'
import { ChooseVote } from '../components/Choose_vote'
import { Connected } from '../components/Connected'
import { NetworkSwitcher } from '../components/NetworkSwitcher'
import { ReadContract } from '../components/ReadContract'
import { ReadContracts } from '../components/ReadContracts'
import { ReadContractsInfinite } from '../components/ReadContractsInfinite'
import { SendTransaction } from '../components/SendTransaction'
import { SendTransactionPrepared } from '../components/SendTransactionPrepared'
import { SignMessage } from '../components/SignMessage'
import { SignTypedData } from '../components/SignTypedData'
import { Token } from '../components/Token'
import { Vote } from '../components/Vote'
import { WatchContractEvents } from '../components/WatchContractEvents'
import { WatchPendingTransactions } from '../components/WatchPendingTransactions'
import { WriteContract } from '../components/WriteContract'
import { WriteContractPrepared } from '../components/WriteContractPrepared'
import { ProposeVote} from '../components/ProposeVote'

export function Page() {
  return (
    <>
    <ConnectButton />

      <Connected>
      </Connected>
      <body className="bg-sky-blue">
      <h1 className="text-3xl font-bold ">Let's Vote by Jean</h1>

      

        <ProposeVote/>
        <br/>
        <div className="text-3xl font-bold text-center">Existing Vote</div>
        
        
        
        <Vote />
       
        
        
        
        
      
      </body>
    </>
  )
}

export default Page
