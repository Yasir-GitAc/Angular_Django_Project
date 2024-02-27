from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = [
            "email",
            "name",
            "profile_image",
            "address",
        ]
        # fields = [
        #     "email",
        #     "name",
        #     "profile_image",
        #     "address",
        #     "password",
        # ]


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = UserChangeForm.Meta.fields
