import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: 'Max' , lastName: 'GMV', email: 'contact@mail.ru'}


  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Добрый день"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Эффективно управляй своей учетной записью и перемешением денежных средств."
          />

          <TotalBalanceBox
           accounts={[]} 
           totalBanks={1} 
           totalCurrentBalance={1250}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[
          {
            currentBalance: 123.45
          }, {
            currentBalance: 678.9
          }]}
      />
    </section>
  )
}

export default Home