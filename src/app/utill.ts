// Author:- Sesha Sai
// File:- Utill.ts
// Purpose:-reusing Sweet alert
import Swal from 'sweetalert2';

export class Utils {
    //create sweet alert and navigate to home screen
    public static showAlert(title, text, icon, router) {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText: 'Ok'
        }).then((result) => {
            router.navigate(['/']);
        });

    }


}