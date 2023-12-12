import { ConnectButton } from '../components/ConnectButton'
import { Connected } from '../components/Connected'
import { Vote } from '../components/Vote'
import { ProposeVote} from '../components/ProposeVote'

export function Page() {
  return (
    <>
    <ConnectButton />

      <Connected>
      </Connected>
      <div className="bg-sky-blue">
      <h1 className="text-3xl font-bold ">Vote by Jean</h1>

      

        <ProposeVote/>
        <br/>
        <div className="text-3xl font-bold text-center">Existing Vote</div>
        
        
        
        <Vote />
       
      </div>
    </>
  )
}

export default Page
