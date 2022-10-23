import {writable} from "svelte/store"
import {browser} from "$app/environment"

const userName = browser && localStorage.getItem('username')

export const username = writable( (browser && userName && (JSON.parse(userName)) || '') )
username.subscribe((v)=> browser && ( localStorage.username = JSON.stringify(v)) )
