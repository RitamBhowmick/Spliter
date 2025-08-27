"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/use-convex-query';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { BarLoader } from 'react-spinners';

const DashboardPage = () => {
  const { data: balances, isLoading: balancesLoading } = useConvexQuery(
    api.dashboard.getUserBalances
  );

  const { data: groups, isLoading: groupsLoading } = useConvexQuery(
    api.dashboard.getUserGroups
  );

  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
    api.dashboard.getTotalSpent
  );

  const { data: monthlySpending, isLoading: monthlySpendingLoading } = 
  useConvexQuery(api.dashboard.getMonthlySpending);

const isLoading =
  balancesLoading ||
  groupsLoading ||
  totalSpentLoading ||
  monthlySpendingLoading;


  return (
    <div>
      {isLoading ? (
        <div className='w-full py-12 flex justify-center'>
          <BarLoader width={"100%"} color='#36d7b7' />
        </div>
      ) : (
        <>
          <div className='flex items-center justify-between'>
            <h1 className='text-5xl gradient-title'>Dashboard</h1>

            <Button asChild>
              <Link href="/expenses/new">
                <PlusCircle className='mr-2 h-4 w-4' />
                Add Expenses
              </Link>
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  Total balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {balances.totalBalance > 0 ? (
                    <span className='text-green-600'>
                      +${balances?.totalBalance.toFixed(2)}
                    </span>
                  ) : balances?.totalBalance < 0 ? (
                    <span className='text-red-600'>
                      -${Math.abs(balances?.totalBalance).toFixed(2)}
                    </span>
                  ) : (
                    <span>$0.00</span>
                  )}

                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage