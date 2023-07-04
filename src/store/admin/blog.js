// Utilities
import { defineStore } from 'pinia'
import { useAppStore } from '../app'

import { auth, db } from '@/plugins/firebase'
import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"

const app = useAppStore()

export const useAdminBlogStore = defineStore('adminBlog', {
    state: () => ({
        image: null,
        title: '',
        body: ``,

        loading: false
    }),

    actions: {
        async savePost() {
            const id = await JSON.parse(localStorage.titiArtCollectionUser).uid

            if (this.image == null || this.title == '' || this.body == '') {
                app.snackbar = {
                    active: true,
                    text: 'Please fill the form to complete the blog',
                    color: 'amber',
                    textColor: 'text-white'
                }
            } else {
                let file = this.image

                const storage = getStorage()

                let link = `blog/${id}/${file.name}`

                const storageRef = ref(storage, link)

                const uploadTask = uploadBytesResumable(storageRef, file)

                this.loading = true

                uploadTask.on('state_changed', snapshot => { },
                    error => { },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(async downloadURL => {
                                await addDoc(collection(db, 'blogs'), {
                                    image: downloadURL,
                                    imageLink: uploadTask.snapshot.ref.fullPath,
                                    title: this.title,
                                    body: this.body,
                                    dateCreated: serverTimestamp(),
                                })

                                this.loading = false

                                app.snackbar = {
                                    active: true,
                                    color: 'green',
                                    text: 'Blog post saved successfully',
                                    textColor: 'text-white'
                                }
                            })
                            .catch(() => {
                                app.snackbar = {
                                    active: true,
                                    color: 'red',
                                    text: 'Blog post was not saved',
                                    textColor: 'text-white'
                                }
                            })
                    })
            }
        }
    }
})
