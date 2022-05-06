import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export type BetSymbol = 'rock' | 'paper' | 'scissors';

export type GameStatus = 'idle' | 'betting' | 'displaying' | 'finished';

export interface Bet {
    betSymbol: BetSymbol
    betAmount: number
}

export interface BettingState {
    pcBetSymbol: BetSymbol | null;
    playerBets: Bet[];
    status: GameStatus;
    balance: number;
    winAmount: number;
    betAmount: number;
    playerWinSymbol: BetSymbol | null;
}

const initialState: BettingState = {
    pcBetSymbol: null,
    playerBets: [],
    status: 'idle',
    balance: 5000,
    winAmount: 0,
    betAmount: 0,
    playerWinSymbol: null,
};

export function getPcBettingSymbol() {
    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * max);
    }
    const symbols: BetSymbol[] = ['rock', 'paper', 'scissors']
    return new Promise<{ data: BetSymbol }>((resolve) =>
        setTimeout(() => resolve({data: symbols[getRandomInt(3)]}), 3000)
    );
}

export function delay(time: number) {
    return new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), time)
    );
}

export function calculateWinner(pc: BetSymbol, player: BetSymbol) {
    const mapper = {
        rock: 0,
        paper: 1,
        scissors: 2,
    }
    if ((mapper[pc] + 1) % 3 === mapper[player]) {
        return player
    } else if (mapper[pc] === mapper[player]) {
        return 'draw'
    } else {
        return pc
    }
}

export function calculateWinAmount(pc: BetSymbol, playerBets: Bet[]) {
    const betsOnRock: BetSymbol[] = playerBets.filter(_ => _.betSymbol === 'rock').map(_ => _.betSymbol);
    const betsOnPaper: BetSymbol[] = playerBets.filter(_ => _.betSymbol === 'paper').map(_ => _.betSymbol);
    const betsOnScissors: BetSymbol[] = playerBets.filter(_ => _.betSymbol === 'scissors').map(_ => _.betSymbol);
    const playerBetSymbols: BetSymbol[] = [];
    const symbols: BetSymbol[] = ['rock','paper','scissors'];

    symbols.forEach((symbol) => {
        if (betsOnRock.includes(symbol) || betsOnPaper.includes(symbol) || betsOnScissors.includes(symbol)) {
            playerBetSymbols.push(symbol)
        }
    })

    if (playerBetSymbols.length === 1) {
        if (calculateWinner(pc, playerBetSymbols[0]) === playerBetSymbols[0]) {
            return playerBets[0].betAmount * playerBets.length * 14;
        } else {
            return 0
        }
    } else {
        const playerWinSymbol = getPlayerWinSymbol(pc, playerBets);
        if (playerWinSymbol) {
            const filteredPlayerBets = playerBets.filter((bet) => {
                return playerWinSymbol === bet.betSymbol
            })
            return filteredPlayerBets[0].betAmount * filteredPlayerBets.length * 2 + filteredPlayerBets[0].betAmount * filteredPlayerBets.length;
        } else {
            return 0
        }
    }
}

export function getPlayerWinSymbol(pc: BetSymbol, playerBet: Bet[]): BetSymbol | null {
    if (playerBet.length === 1 && calculateWinner(pc, playerBet[0].betSymbol) === playerBet[0].betSymbol) {
        return playerBet[0].betSymbol
    }
    if (playerBet.length === 2) {
        let playerWinSymbol = null;
        playerBet.forEach((bet) => {
            if (calculateWinner(pc, bet.betSymbol) === bet.betSymbol) {
                playerWinSymbol = bet.betSymbol;
            }
        })
        return playerWinSymbol
    }
    return null
}

export function getBetAmount(playerBet: Bet[]): number {
    return playerBet.reduce((sum, current) => sum + current.betAmount, 0);
}

export function checkAllowBet(symbol: BetSymbol, playerBet: Bet[], balance: number): boolean {
    const symbols = playerBet.map(_ => _.betSymbol);
    const uniqueSymbols: BetSymbol[] = [];
    symbols.forEach((symbol) => {
        if (!uniqueSymbols.includes(symbol)) {
            uniqueSymbols.push(symbol);
        }
    });
    if ((uniqueSymbols.length < 2 || (uniqueSymbols.length === 2 && uniqueSymbols.includes(symbol))) && balance >= 500) {
        return true
    } else {
        return false
    }
}

export const getPcBettingResultAsync = createAsyncThunk(
    'betting/getPcBettingSymbol',
    async (_, thunkAPI) => {
        const response = await getPcBettingSymbol();
        thunkAPI.dispatch(showWinAsync());
        return response.data;
    }
);

export const showWinAsync = createAsyncThunk(
    'betting/showWin',
    async () => {
        await delay(3000);
        return null;
    }
);

export const bettingSlice = createSlice({
    name: 'betting',
    initialState,
    reducers: {
        placeBet: (state, action: PayloadAction<Bet>) => {
            state.playerBets = [...state.playerBets, ...[action.payload]];
            state.betAmount = getBetAmount(state.playerBets);
            state.balance = state.balance - action.payload.betAmount;
        },
        clear: (state) => {
            state.pcBetSymbol = null;
            state.playerBets = [];
            state.winAmount = 0;
            state.betAmount = 0;
            state.status = 'idle';
            state.playerWinSymbol = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPcBettingResultAsync.pending, (state) => {
                state.status = 'betting';
            })
            .addCase(getPcBettingResultAsync.fulfilled, (state, action) => {
                state.status = 'displaying';
                state.pcBetSymbol = action.payload;
                state.winAmount = calculateWinAmount(state.pcBetSymbol, state.playerBets);
                state.playerWinSymbol = getPlayerWinSymbol(state.pcBetSymbol, state.playerBets);
                state.betAmount = getBetAmount(state.playerBets);
                state.balance = state.balance + state.winAmount;
            })
            .addCase(showWinAsync.pending, (state) => {
                state.status = 'displaying';
            })
            .addCase(showWinAsync.fulfilled, (state) => {
                state.status = 'finished';
            })
    },
});

export const {placeBet, clear} = bettingSlice.actions;

export const selectPlayerBets = (state: RootState) => state.betting.playerBets;
export const selectWinAmount = (state: RootState) => state.betting.winAmount;
export const selectBetAmount = (state: RootState) => state.betting.betAmount;
export const selectStatus = (state: RootState) => state.betting.status;
export const selectBalance = (state: RootState) => state.betting.balance;
export const selectPcBetSymbol = (state: RootState) => state.betting.pcBetSymbol;
export const selectPlayerWinSymbol = (state: RootState) => state.betting.playerWinSymbol;

export default bettingSlice.reducer;
