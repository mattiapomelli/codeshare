import { NextPage } from 'next'
import DefaultLayout from '@/layouts/DefaultLayout'

type LayoutType = typeof DefaultLayout

/* eslint-disable @typescript-eslint/ban-types */
export type PageWithLayout<P = {}> = NextPage<P> & { layout: LayoutType }
