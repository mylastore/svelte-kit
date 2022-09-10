import {writable} from "svelte/store"
import {browser} from "$app/environment"

export const userName = writable((browser && localStorage.getItem('userName') || ''))
userName.subscribe((v)=> browser && (localStorage.userName = v))
