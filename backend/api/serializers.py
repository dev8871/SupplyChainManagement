from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# class SignupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['email', 'password', 'company']
#         extra_kwargs = {
#             'password' : {'write_only': True}
#         }

#     def create(self, validated_data):
#         validated_data['password'] = make_password(validated_data['password'])
        
#         user = User.objects.create(**validated_data)
#         return user

# class LoginSerializer(serializers.Serializer):

#     email = serializers.EmailField()
#     password = serializers.CharField()

#     def validate(self, data):
#         email = data.get("email")
#         password = data.get("password")

#         try: 
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             raise serializers.ValidationError("User not found")
        
#         if not check_password(password, user.password):
#             raise serializers.ValidationError("Invalid password")
        
#         data['user'] = user
#         return data